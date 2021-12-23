import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import { Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, useDisclosure, Button, Flex, FormControl, Select, Textarea, FormLabel, Box } from '@chakra-ui/react'

const TodoPopup = (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleSubmit, register } = useForm()

    const createTodoTask = data => console.log(data)

    const handleSubmitForm = event => {
        event.preventDefault()

        handleSubmit(createTodoTask)(event)
        onClose()
    }
 
    useImperativeHandle(ref, () => ({ openTodoPopup: () => onOpen() }))

    return(
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Todo task</ModalHeader>

                <ModalCloseButton />

                <ModalBody>
                    <Flex as="form" onSubmit={() => console.log('Oi')} flexDir="column" rowGap={6}>

                        <Box>
                            <FormLabel htmlFor='title' fontWeight="bold">Todo title</FormLabel>
                            <Input {...register('title', { required: true })}/>
                        </Box>

                        <Box>
                            <FormLabel htmlFor='priority' fontWeight="bold">Priority</FormLabel>
                            <Select {...register('priority')}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </Select>
                        </Box>

                        <Box>
                            <FormLabel htmlFor='description' fontWeight="bold">Description</FormLabel>
                            <Textarea {...register('description')} resize="none" h={36}/>
                        </Box>

                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button onClick={handleSubmitForm} variant='ghost'>Create</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(TodoPopup)