import { Button } from "@chakra-ui/react"
import ConvertToVegetaFormat from '../../../apis/server_logs/ConvertToVegetaFormat'

const ConvertVegetaFormatButton = () => {
    const convertLogToVegeta = () => {
        const res = ConvertToVegetaFormat();
        res.then(res => console.log(res))
    }
    return (
        <Button
            size="sm"
            onClick={() => convertLogToVegeta()}
        >
            Convert Server Log To Vegeta Format
        </Button>
    )
}

export default ConvertVegetaFormatButton