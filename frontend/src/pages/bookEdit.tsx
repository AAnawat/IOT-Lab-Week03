import NavBar from "../components/navBar";
import { useParams } from "react-router-dom";
import { Container, TextInput, Textarea, TagsInput, Divider, Group, Button } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import apiCaller from "../services/axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function BookEdit() {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const noModifyTags = useRef(null)
    const deleteTags = useRef([])
    const addTags = useRef([])

    const { bookId } = useParams();
    const navigate = useNavigate();

    const form = useForm({
            mode: 'uncontrolled',
            initialValues: {
            name: '',
            desc: '',
            syno: ''
        },

        validate: {
            name: (value) => (/.+/.test(value) ? null : 'กรุณาระบุชื่อหนังสือ'),
            desc: (value) => (/.+/.test(value) ? null : 'กรุณาระบุคำอธิบาย'),
            syno: (value) => (/.+/.test(value) ? null : 'กรุณาระบุเรื่องย่อ')
        },
    });

    useEffect(() => {
        setLoadingSubmit(true);
        setLoadingDelete(true);

        apiCaller.get(`/books/${bookId}`)
                    .then((response) => {
                        const data = response.data.result;
                        noModifyTags.current = data.genres

                        form.setValues(
                            {
                                name: data.title,
                                desc: data.description,
                                syno: data.synopsis
                            }
                        )

                        setTags(data.genres.map((genre: {id: number, title: string}) => genre.title))
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
                        setLoadingSubmit(false);
                        setLoadingDelete(false);
                    })
    }, [])

    const handleTags = (nextTags: string[]) => {
        if (nextTags.length < tags.length) {
            const deleted = tags.find((tag) => !nextTags.includes(tag));
            
            const deleted_id = noModifyTags.current.find((tag: {id: number, title: string}) => tag.title === deleted) 
            deleteTags.current.push(deleted_id.id)

        } else if (nextTags.length > tags.length) {
            const added = nextTags.find((tag) => !tags.includes(tag));

            addTags.current.push(added)
        }

        setTags(nextTags);
    }

    const handleSubmit = () => {
        setLoadingSubmit(true)

        const formData = form.getValues()

        apiCaller.patch(`/books/${bookId}`, {
            title: formData.name,
            description: formData.desc,
            synopsis: formData.syno,
            deleteGenre: deleteTags.current,
            addGenre: addTags.current
        })
        .then(() => {
            navigate(`/books/${bookId}`)
        })
        .catch((err) => {
            console.log(err)
            notifications.show({
                title: "Error",
                message: "Can't send this data to server",
                color: "red"
            })
        })
        .finally(() => {
            setLoadingSubmit(false)
        })
    }

    const handleDelete = () => {
        setLoadingDelete(true)

        apiCaller.delete(`/books/${bookId}`)
                    .then(() => {
                        navigate('/books')
                    })
                    .catch((err) => {
                        console.log(err)
                        notifications.show({
                            title: "Error",
                            message: "Can't delete this book",
                            color: "red"
                        })
                    })
                    .finally(() => {
                        setLoadingDelete(false)
                    })

    }

    return <NavBar>
        <Container mt={20}>
            <h2 className="mg-bt-sm">แก้ไขข้อมูลหนังสือ</h2>
            <form className="space-form-nm" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="ชื่อหนังสือ" placeholder="ชื่อหนังสือ" key={form.key('name')} {...form.getInputProps('name')}/>
                <TextInput label="คำอธิบาย" placeholder="คำอธิบายหนังสือ" key={form.key('desc')} {...form.getInputProps('desc')} />
                <Textarea label="เรื่องย่อ" placeholder="เรื่องย่อ" key={form.key('syno')} rows={10} {...form.getInputProps('syno')} />
                <TagsInput label="Genres" value={tags} onChange={handleTags} placeholder="Enter tag" />
                <Divider mt={20} />
                <Group justify="space-between" mt="md">
                    <Button type="button" onClick={handleDelete} loading={loadingDelete} color="red">ลบหนังสือนี้</Button>
                    <Button type="submit" loading={loadingSubmit}>บันทึกข้อมูล</Button>
                </Group>
            </form>
        </Container>
    </NavBar>
}