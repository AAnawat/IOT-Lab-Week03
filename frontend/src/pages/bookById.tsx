import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import { Link, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import apiCaller from "../services/axios";
import { Flex, Loader, Container, Stack, Badge, Group, Divider, Button } from "@mantine/core";

import './bookById.css'

export default function BookById() {
    const [ bookData, setBookData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const { bookId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)

        apiCaller.get(`/books/${bookId}`)
                    .then((book) => {
                        setBookData(book.data.result)
                    })
                    .catch((err) => {
                        console.log(err)
                        notifications.show({
                            title: "Error",
                            message: "Can't get this book information",
                            color: "red"
                        })
                        navigate('/books')
                    })
                    .finally(() => {
                        setLoading(false)
                    })
    }, [])
    if (loading) {
        return <NavBar>
            <Flex style={{ height: '50vh' }} justify={"center"} align={"center"}>
                <Loader />
            </Flex>
        </NavBar>
    } else if (!loading && bookData) {
        return <NavBar>
            <Container>
                <h1>{bookData.title}</h1>
                <h3 className="mg-bt-sm text-gray">{bookData.author}</h3>
                <Flex gap={"xl"} className="mg-bt-nm">
                    <img src="https://placehold.co/150x200" alt={bookData.title} id="book-cover" />
                    <Stack className="space-form-sm">
                        <section>
                            <h4>รายละเอียดหนังสือ</h4>
                            <p>{bookData.description}</p>
                        </section>
                        <section>
                            <h4>เรื่องย่อ</h4>
                            <p>{bookData.synopsis}</p>
                        </section>
                        <section>
                            <h4>หมวดหมู่</h4>
                            <Group gap={"sm"}>
                                {bookData.genres.map((tag: {id: number, title: string}, index: number) => (
                                    <Badge key={index}>{tag.title}</Badge>
                                ))}
                            </Group>
                        </section>
                    </Stack>
                </Flex>
                <Divider className="mg-bt-nm" />
                <Group>
                    <Button component={Link} to={`/books/${bookId}/edit`}>แก้ไขข้อมูลหนังสือ</Button>
                </Group>
            </Container>
        </NavBar>
    }
}