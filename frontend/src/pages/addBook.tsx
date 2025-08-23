import NavBar from "../components/navBar";
import { useForm } from '@mantine/form';
import { Textarea, TextInput, Group, Button, Divider, Container, TagsInput} from "@mantine/core";
import './addBook.css'
import { useState } from "react";
import apiCaller from "../services/axios";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const navigate = useNavigate()

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

    const handleAddBook = () => {
        setLoading(true)
        const { name, desc, syno } = form.getValues()

        apiCaller({
            method: 'post',
            url: '/books',
            data: {
                title: name,
                description: desc,
                synopsis: syno,
                genres: tags
            }
        })
        .then(() => {
            notifications.show({
                title: "เพิ่มข้อมูลหนังสือสำเร็จ",
                message: "ข้อมูลหนังสือได้รับการเพิ่มเรียบร้อยแล้ว",
            })
            navigate('/books')
        })
        .catch((error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                notifications.show({
                    title: "ข้อมูลไม่ถูกต้อง",
                    message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
                    color: "red",
                });
                } else if (error.response?.status || 500 >= 500) {
                notifications.show({
                    title: "เกิดข้อผิดพลาดบางอย่าง",
                    message: "กรุณาลองใหม่อีกครั้ง",
                    color: "red",
                });
                }
            } else {
                notifications.show({
                title: "เกิดข้อผิดพลาดบางอย่าง",
                message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
                color: "red",
                });
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return <NavBar>
        <Container mt={20}>
            <h2 className="mg-bt-sm">เพิ่มหนังสือในระบบ</h2>
            <form className="space-form-nm" onSubmit={form.onSubmit(handleAddBook)}>
                <TextInput label="ชื่อหนังสือ" placeholder="ชื่อหนังสือ" key={form.key('name')} {...form.getInputProps('name')}/>
                <TextInput label="คำอธิบาย" placeholder="คำอธิบายหนังสือ" key={form.key('desc')} {...form.getInputProps('desc')} />
                <Textarea label="เรื่องย่อ" placeholder="เรื่องย่อ" key={form.key('syno')} rows={10} {...form.getInputProps('syno')} />
                <TagsInput label="Genres" value={tags} onChange={setTags} placeholder="Enter tag" />
                <Divider mt={20} />
                <Group justify="flex-start" mt="md">
                    <Button type="submit" loading={loading}>บันทึกข้อมูล</Button>
                </Group>
            </form>
        </Container>
    </NavBar>
}