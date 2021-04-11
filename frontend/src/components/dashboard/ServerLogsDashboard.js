import { ChakraProvider } from "@chakra-ui/react";
import UploadServerLogsButton from './server_logs/UploadServerLogsButton'
import ConvertVegetaFormatButton from './server_logs/ConvertVegetaFormatButton'
import RequestHistory from './server_logs/RequestHistory'

const ServerLogsDashboard = () => {
    return (
        <ChakraProvider>
            <UploadServerLogsButton />
            <ConvertVegetaFormatButton />
            <RequestHistory />
        </ChakraProvider>
    )
}

export default ServerLogsDashboard