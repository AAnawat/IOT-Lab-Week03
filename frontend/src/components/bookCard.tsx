import { Box, Flex } from "@mantine/core";

import React from "react";

interface basicProps {
    name: string
    desc: string
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export default function BookCard({name, desc, onClick}: basicProps) {
    return <Flex gap={"md"} align={'center'} bg={"rgba(0, 0, 0, .3)"} p={5} className="hover" onClick={onClick}>
        <img src="https://placehold.co/150x200" alt="placeholder" />
        <Box>
            <h3>{name}</h3>
            <p>{desc}</p>
        </Box>
    </Flex>
}