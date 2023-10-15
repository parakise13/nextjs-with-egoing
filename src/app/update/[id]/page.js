"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`)
            .then((resp) => {
                return resp.json();
            })
            .then((result) => {
                setTitle(result.title);
                setBody(result.body);
            });
    }, [id]);

    return (
        // onSubmit은 사용자와 상호작용하는 것 => "use client"필요
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // 여기서 target은 form / title은 name이 title인것을 의미
                const title = e.target.title.value;
                const body = e.target.body.value;

                const options = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, body }),
                };

                fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, options)
                    .then((res) => res.json())
                    .then((result) => {
                        const lastid = result.id;
                        router.refresh();
                        router.push(`/read/${lastid}`);
                    });
            }}
        >
            <p>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(evt) => setTitle(evt.target.value)}
                />
            </p>
            <p>
                <textarea
                    name="body"
                    placeholder="body"
                    value={body}
                    onChange={(evt) => setBody(evt.target.value)}
                />
            </p>
            <p>
                <input type="submit" value={"update"} />
            </p>
        </form>
    );
}
