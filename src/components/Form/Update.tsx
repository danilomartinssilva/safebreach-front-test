import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, Text } from "@chakra-ui/layout";
import { yupResolver } from '@hookform/resolvers/yup';
import { format, parseISO } from 'date-fns';
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import IContact from "../../types/IContact";
interface IFormUpdateContactInputProps{
  contact:IContact | undefined;
  onSubmit:(data:any)=>void;
  fetchLoading:boolean;
  updateLoading:boolean;
}


export default function FormUpdateContact({contact,onSubmit,fetchLoading,updateLoading}:IFormUpdateContactInputProps){
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    birthday:Yup.date().required('Birthday is required'),
    address: Yup.string()
      .required('Address is required').min(10),
    phone:Yup.string().required("Phone is required"),      
  });
  const {register,handleSubmit,reset, formState:{errors}} = useForm({
    resolver:yupResolver(validationSchema),
  
  })
  const formatDate = useMemo(()=>{
    return format(parseISO(contact?.birthday?.split('T')[0] as string).getTime(),"yyyy-MM-dd")
  },[])
  useEffect(()=>{
    reset({...contact,birthday: formatDate})
  },[contact?._id])

 
  
  return (
    <Stack maxW="850px" w={["xs","container.xl"]} spacing={4}>
              
    <FormControl>
      <FormLabel>Name</FormLabel>
      <Input  id="name" placeholder="enter your name..." 
      defaultValue = {contact?.name}
      {...register("name")}

      />
      <Text color = "red" > {errors?.name?.message}</Text>              
    </FormControl>  
   
      <FormControl>
        <FormLabel>Birthday</FormLabel>
        <Input  id="birthday" placeholder="enter your birthday..." type="text" 
        defaultValue = {formatDate}
        {...register("birthday")}

        />    
                
      </FormControl>    
    
      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input  id="address" placeholder="enter your address..." type="text" 
        defaultValue = {contact?.address}
        {...register("address")}
        />       
        <Text color = "red" > {errors?.address?.message}</Text>                    
      </FormControl>    
      <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input  id="phone" placeholder="enter your phone..." type="tel" 
        defaultValue = {contact?.phone_number}
        {...register("phone")}

        />      
          <Text color = "red" > {errors?.phone?.message}</Text>          
      </FormControl>    
    <Button
     maxW="850px" 
     isLoading = {updateLoading}
     loadingText="Sending"
     bg="green" 
     isDisabled = {Boolean(Object.keys(errors).length)} 
     onClick = {handleSubmit(onSubmit)}> Send  </Button>
  </Stack>        
  )
}