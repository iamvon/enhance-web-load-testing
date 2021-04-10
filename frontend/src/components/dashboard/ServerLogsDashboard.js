import { ChakraProvider } from "@chakra-ui/react";
import UploadServerLogsButton from './server_logs/UploadServerLogsButton'
import ConvertVegetaFormatButton from './server_logs/ConvertVegetaFormatButton'

const ServerLogsDashboard = () => {
    return (
        <ChakraProvider>
            <UploadServerLogsButton />
            <ConvertVegetaFormatButton />
        </ChakraProvider>
    )
}

export default ServerLogsDashboard