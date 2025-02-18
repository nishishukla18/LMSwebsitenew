import { Webhook } from "svix";
import User from "../models/userModel.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_address[0].email_address,
                    imageUrl: data.imageUrl,
                };
                await User.create(userData);
                return res.status(200).json({ message: "User created successfully" });
            }

            case "user.updated": {
                const userData = {
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_address[0].email_address,
                    imageUrl: data.imageUrl,
                };
                await User.findByIdAndUpdate(data.id, userData);
                return res.status(200).json({ message: "User updated successfully" });
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ message: "User deleted successfully" });
            }

            default:
                return res.status(400).json({ message: "Invalid event type" });
        }

    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        return res.status(500).json({ success: false, message: error.message });
    }
};
