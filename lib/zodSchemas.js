import { z } from "zod"

export const journalEntrySchema = z.object({
    title : z.string().min(1, "title is required."),
    content : z.string().min(1, "content is required."),
    mood : z.string().min(1,"mood is required."),
    collectionId  : z.string().optional()
})