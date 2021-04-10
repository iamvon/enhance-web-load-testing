import React, { useState } from 'react';
import { useToast } from "@chakra-ui/react"
import UploadServerLogs from '../../../apis/server_logs/UploadServerLogs'
import { Flex, Button, Text } from "@chakra-ui/react"

const UploadServerLogsButton = () => {
    const [isUploading, setIsUploading] = useState(false);

    const toast = useToast()
    let hiddenInput = null;

    const handleFileSelect = async (file) => {
        setIsUploading(true);

        try {
            const result = await UploadServerLogs(file)
            if (result == undefined || result.statusText != "OK")
                throw new Error("Error Uploading File")

            toast({
                duration: 5000,
                status: "success",
                isClosable: true,
                title: "Upload Complete.",
                description: "The server log file has been sent to the server.",
            })
        } catch (err) {
            toast({
                duration: 9000,
                status: "error",
                isClosable: true,
                title: "Upload Error.",
                description: "Something went wrong when uploading your file!",
            })
        }

        setIsUploading(false);
    }

    return (
        <>
            <Button
                size="sm"
                isLoading={isUploading}
                loadingText="Uploading..."
                onClick={() => hiddenInput.click()}
            >
                Upload Server Logs File
            </Button>

            <input
                hidden
                type='file'
                ref={el => hiddenInput = el}
                onChange={(e) => {
                    handleFileSelect(e.target.files[0])
                    e.target.value = null;
                }}
            />
        </>
    )
}

export default UploadServerLogsButton