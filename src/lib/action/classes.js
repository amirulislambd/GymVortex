'use server'

import { ServerMutation } from "../core/serverMutation"

export const PostClass = async (data) => {
    return ServerMutation('classes', data)
};