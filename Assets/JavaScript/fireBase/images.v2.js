import { auth, keyTracker } from "./app.js"

// Setup these safe public variables
const CLOUD_NAME = "or8nbcav"
const BACKEND_URL = "https://efill-backend.vercel.app"
export const FALLBACK_IMAGE = "/Assets/Images/thumbs/16.webp"

const NIMGID = "nextImgId"
const IMAGES = "images/"

// Upload image to storage & tracking next image id in database
export const uploadImage = async (ownerId, file, path) => {
    try {
        // Get & Update new image id
        const pathNotEmpty = String(path).length > 0 && path != ""
        if (pathNotEmpty === false) {
            path = IMAGES + await keyTracker(NIMGID)
        }

        const isFile = file instanceof File

        if (isFile) {
            const user = auth.currentUser
            if (!user) {
                throw new Error("Unauthorized to upload")
            }
            const token = await user.getIdToken()

            // 1. Get the signature from Vercel (passing your path and ownerId for metadata)
            const signRes = await fetch(`${BACKEND_URL}/api/sign-upload`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ path, ownerId })
            })
            if (!signRes.ok) {
                throw new Error("Failed to sign upload request")
            }
            const { signature, timestamp, folder, apiKey } = await signRes.json()

            // 2. Upload to Cloudinary acting exactly like Firebase uploadBytes
            const formData = new FormData()
            formData.append("file", file)
            formData.append("api_key", apiKey)
            formData.append("timestamp", timestamp)
            formData.append("signature", signature)
            formData.append("folder", folder)
            formData.append("public_id", path) // Forces Cloudinary to use "images/01"
            formData.append("context", `owner=${ownerId}`) // This is customMetadata

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            if (!uploadRes.ok) throw new Error("Cloudinary upload failed")

            // Return exactly what Firebase used to return (e.g., "images/01")
            return path
        }
        else if (pathNotEmpty) {
            return path
        }
        else throw new Error("No file or path provided")
    }
    catch (error) {
        throw error.message || error
    }
}

// Convert image path as a download url
export const getImgUrl = async (path) => {
    try {
        if (!path || path.trim() === "") {
            return FALLBACK_IMAGE
        }

        // Append a Cloudinary's path-based version (/v{timestamp}/) to bypass Cloudinary CDN cache on updates
        const timestamp = Date.now()

        // Automatically optimize format (f_auto) and quality (q_auto) on load
        const cloudinaryUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/v${timestamp}/efill_bunks/${path}`

        // Silently test if the legacy image actually exists in Cloudinary
        const exists = await checkImageExists(cloudinaryUrl)
        return exists ? cloudinaryUrl : FALLBACK_IMAGE
    }
    catch (error) {
        throw error.message || error
    }
}

// Helper function to test if an image URL returns 200 OK without console spam
const checkImageExists = (url) => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = url
    })
}

// Delete image
export const deleteImage = async (path) => {
    try {
        if (!path || path.trim() === "") return true

        const user = auth.currentUser
        if (!user) {
            throw new Error("Unauthorized to delete")
        }
        const token = await user.getIdToken()

        // Pass the full Cloudinary path (folder + image ID) to backend for deletion
        const publicId = `efill_bunks/${path}`

        const res = await fetch(`${BACKEND_URL}/api/delete-image`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ publicId })
        })

        if (!res.ok) {
            throw new Error("Deletion failed")
        }
        return true
    }
    catch (error) {
        throw error.message || error
    }
}