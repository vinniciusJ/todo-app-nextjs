import React, { useRef } from 'react'
import Todo from '../components/Todo'

import { Flex, Box, Heading,Button } from '@chakra-ui/react'
import TodoPopup from '../components/TodoPopup'

const Home = () => {
	const todoPopupRef = useRef(null)

	const openTodoPopup = () => todoPopupRef.current.openTodoPopup()

	return (
		<Flex 
			as="main"
			flexDirection="column" 
			gap={6} 
			px={20}
			py={12}
			
			h="100vh"
			bgColor="gray.50"
		>
			<Box as="section">
				<Flex as="header" justifyContent="space-between">
					<Heading as="h1"size="xl" pb={12}>
						To Do
					</Heading>
					<Button variant="outline" colorScheme="teal" onClick={openTodoPopup}>+</Button>

					<TodoPopup ref={todoPopupRef}/>
				</Flex>

				<Flex as="section" flexWrap="wrap" gap={8}>
					<Todo 
						title="Lorem ipsum solor sit amnet"
						priority="High Priority"
						createdAt="22/12/2021"
						description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic eum dolores iusto error fugiat? Quaerat corrupti odit illo, id aliquam at quam, architecto impedit quos perspiciatis facere, temporibus fugiat doloribus."
					/>
					<Todo 
						isDone
						title="Lorem ipsum solor sit amnet"
						priority="High Priority"
						createdAt="22/12/2021"
						description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic eum dolores iusto error fugiat? Quaerat corrupti odit illo, id aliquam at quam, architecto impedit quos perspiciatis facere, temporibus fugiat doloribus."
					/>
					<Todo 
						title="Lorem ipsum solor sit amnet"
						priority="High Priority"
						createdAt="22/12/2021"
						description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic eum dolores iusto error fugiat? Quaerat corrupti odit illo, id aliquam at quam, architecto impedit quos perspiciatis facere, temporibus fugiat doloribus."
					/>
					<Todo 
						title="Lorem ipsum solor sit amnet"
						priority="High Priority"
						createdAt="22/12/2021"
						description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic eum dolores iusto error fugiat? Quaerat corrupti odit illo, id aliquam at quam, architecto impedit quos perspiciatis facere, temporibus fugiat doloribus."
					/>
					
				</Flex>
			</Box>
			<Box as="section">
				<Heading as="h1"size="xl">
					Done
				</Heading>
			</Box>
		</Flex>
	)
}

export default Home
