import { useContext } from 'react'
import { Button, ButtonGroup } from "@chakra-ui/react"
import VegetaAttack from '../../../apis/vegeta/VegetaAttack'

const AttackButton = () => {
    return (
        <Button
            colorScheme="blue"
            onClick={() => VegetaAttack()}
        >
            Attack
        </Button>
    )
}

export default AttackButton;