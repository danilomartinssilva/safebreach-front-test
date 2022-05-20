import { Image } from '@chakra-ui/image';
import { Flex, Text, VStack } from '@chakra-ui/layout';
import IContact from '../../types/IContact';

interface ITableYellowInputProps {
  data:IContact[]
}

export default function TableYellow({data}:ITableYellowInputProps){
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }
  return(
    <>
      {data.map((item,index)=>(

      <Flex h={["min"]}  w="850px" borderRadius={8} borderWidth={1} m = {4} key = {item._id}>
        <Image   w="100%"
          maxW="200px"
          h="100%"
          maxH="220px" src={`../../assets/images/${item.picture==="image0.png" ? "image1.png":item.picture}`} borderLeftRadius = {8} objectFit="cover" />
        <VStack  p="16px"
        spacing="16px"
        align="flex-start"
        maxW="450px"
        minW="200px"
        h="100%"
        w="100%"
       >
          <Text  fontWeight="bold" >{item.name}</Text>
          <Text>Address: {item.address}</Text>
          <Text>Birthday: {item.birthday.split("T")[0] }</Text>
          <Text>Phone: {item.phone_number}</Text>         
        </VStack>
      </Flex>

      ))}
    </>
  )
}