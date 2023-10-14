export default async function Read(props) {
    // 사용자와 상호작용 하는 페이지가 아니라 단순히 서버에서 가져온 데이터를 읽어서 출력할 뿐이기 때문에 서버컴포넌트를 사용하는 것이 좋다.

    const resp = await fetch(
        `http://localhost:9999/topics/${props.params.id}`,
        { cache: "no-store" }
    );
    const topic = await resp.json();

    return (
        <>
            <h2>{topic.title}</h2>
            {topic.body}
        </>
    );
}
