import { Button, Flex, FormControl, Icon, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { ChangeEvent, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import IContactQuery from '../types/IContactQuery';

interface ISearchBoxInputProps  {
  handleSubmit:(query:IContactQuery)=>void
  loading:boolean;

}

export function SearchBox(act:ISearchBoxInputProps) {
  // Controlled components
  const [search, setSearch] = useState<string>('');

  function handleChangeSearchBox(event: ChangeEvent<HTMLInputElement>) {
    const query = {
      name: [],
      age: [],
      phone: [],
    }   
    setSearch(event.target.value);
  }
  function handleSubmit(){

  }

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      mt="8"
      mb="4"
      w={['820px', '300px', '600px']}      
      alignSelf="center"
      color="gray.200"   

      bg="gray.800"
      borderRadius="full"
    >
      <Formik initialValues={{ query:"" }}
      validate = {(values=>{
        if(!values.query){

        }
      })}
      onSubmit={(values, actions) => {
        const query:IContactQuery = {
          phone:[],
          name:[],
          address:[],
          birthday:[]
        }
        
        const arrayValues = values.query.split(" ")
        arrayValues.forEach((el:string) => {
            if (/[a-zA-Z]+/i.test(el)) {
              query.name?.push(el)
            } else if (el[0] === "(" || el[0] === "0" || el.length > 3) {
              query.phone?.push(el)
            } else if (parseInt(el) < 150) {
              query.birthday?.push(el)
            } else if (el.length > 3) {
              query.phone?.push(el)
            }
          })
       act.handleSubmit(query)
        
       
      }}>
        {(props)=>(
          <Form style= {{ display:"flex", justifyContent:"space-between",width:"820px"}}>
            <Field name="query"  >
            {(form:any)=>(
              <FormControl display="flex" >                
                <Input
                  
                  {...form.field}
                  color="gray.50"
                  id="query"                  
                  variant="unstyled"
                  px="4"
                  mr="4"        
                  placeholder="Search by name, phone, address"
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  value={props.values.query}     
                  name="query"   
                  onChange={props.handleChange}                 
                />
            </FormControl>

            )}
            </Field>
            
            <Button id="btnSubmitSearch" isLoading = {act.loading} variant="unstyled" type="submit">
              {!act.loading && (

                <Icon as={RiSearchLine} fontSize="20" />
              )}
            </Button>  
          </Form>
        )}


      </Formik>
 
    </Flex>
  );
}
