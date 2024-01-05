import { Button, ButtonGroup, styled } from "@mui/material";


const Component = styled(Group)`
    margin-top: 30px;
`

const StyledButton = styled(Button)`
    border-radius: 50%;
    backgroundColor:#ef9273;
    color:white;
`


const GroupedButton = ({ quantity }) => {
    return (
        <Component>
            <StyledButton >-</StyledButton>
            <Button disabled>{quantity}</Button>
            <StyledButton>+</StyledButton>
        </Component>
    )
}

export default GroupedButton;