import { Button } from "@chakra-ui/react"
import ConvertToVegetaFormat from '../../../apis/server_logs/ConvertToVegetaFormat'

const ConvertVegetaFormatButton = () => {
    const convertLogToVegeta = async () => {
        try {
            const data = await ConvertToVegetaFormat();
            console.log(data)
        }
        catch(e) {
            console.log(e)
        }
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