import {FiEdit} from "@react-icons/all-files/fi/FiEdit";
import {Button, Input,Grid,GridItem} from "@chakra-ui/react";
import {IoAddCircle} from "@react-icons/all-files/io5/IoAddCircle";
import {IoDocumentOutline} from "@react-icons/all-files/io5/IoDocumentOutline";
import {BiSearch} from "@react-icons/all-files/bi/BiSearch";
import { ButtonGroup } from '@chakra-ui/react'
export default function Head(){
    return <Grid templateColumns='repeat(3, 1fr)' id={"head-nav"}>
        <GridItem colSpan={2} gap={0} className={"mt-2 pl-4"} style={{"textAlign":"left"}}>


                 <span style={{"color":"gray","fontSize":"32px"}} className={"inline align-middle"}>
                     <img src={"cat.png"} width={32} style={{"opacity":0.5}} className={"inline mr-1"}/>
                     Me
    <FiEdit size={20} className={"inline"}/>w
    </span>

            <Button className={"inline ml-4 mr-2   align-middle"} variant='outline' colorScheme={"facebook"} leftIcon={<IoAddCircle size={16}/>}>
                New File
            </Button>
            <Button  className={"inline ml-1 align-middle"} variant='outline'  colorScheme={"facebook"} leftIcon={<IoDocumentOutline size={16}/>}>
                Open
            </Button>

            <Input name={"search-key"} className={"align-middle ml-4"} htmlSize={4} style={{"minWidth":"150px"}} width='auto'  />
            <Button className={"ml-2 align-middle"} colorScheme={"facebook"} variant='outline' leftIcon={<BiSearch size={16}/>}>
                Go
            </Button>
        </GridItem>
        <GridItem>

        </GridItem>



    </Grid>
}
