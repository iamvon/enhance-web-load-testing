import { ChakraProvider } from "@chakra-ui/react";
import AttackButton from './vegeta/AttackButton'
import AttackStatistics from './vegeta/statistics/AttackStatistics'
import AttackContext from '../Attack'

const AttackDashboard = () => {
    return (
        <ChakraProvider>
            <AttackStatistics />
            <AttackButton />
        </ChakraProvider>
    )
}

export default AttackDashboard