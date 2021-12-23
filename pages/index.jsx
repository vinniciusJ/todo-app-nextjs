import React, { useRef, useEffect } from 'react'
import Todo from '../components/Todo'

import { Flex, Box, Heading,Button } from '@chakra-ui/react'
import TodoPopup from '../components/TodoPopup'
import { api } from '../services/api'

const Home = ({ tasksToDo, doneTasks }) => {
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

					{ tasksToDo.map(task => (
						<Todo {...task}/>
					)) }
					
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

export const getStaticProps = async context => {
	const data = await (await api.get('/todo')).data

	const tasksToDo = data.filter(datum => !datum.isDone)
	const doneTasks = data.filter(datum => datum.isDone)

	return {
		props: {
			tasksToDo, doneTasks
		}
	}
}

export default Home
