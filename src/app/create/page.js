"use client";

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();

    return (
        // onSubmit은 사용자와 상호작용하는 것 => "use client"필요
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // 여기서 target은 form / title은 name이 title인것을 의미
                const title = e.target.title.value;
                const body = e.target.body.value;

                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, body }),
                };

                // client component에서 환경변수 사용
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, options)
                    .then((res) => res.json())
                    .then((result) => {
                        const lastid = result.id;
                        router.refresh();
                        router.push(`/read/${lastid}`);
                    });
            }}
        >
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body" />
            </p>
            <p>
                <input type="submit" value={"create"} />
            </p>
        </form>
    );
}
