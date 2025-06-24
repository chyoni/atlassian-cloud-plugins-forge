import React from 'react';
import {Button, DynamicTable, Inline, User} from "@forge/react";

const head = {
    cells: [
        {
            key: "title",
            content: "Title",
            isSortable: true,
        },
        {
            key: "content",
            content: "Content",
            shouldTruncate: true,
            isSortable: true,
        },
        {
            key: "author",
            content: "Author",
            isSortable: true,
        },
        {
            key: "action",
            content: "Action",
            isSortable: true,
        },
    ],
};

export const Board = ({articles, loading, onDeleteArticle}) => {

    const rows = articles.map((article, index) => ({
        key: `article:${article.id}:${index}`,
        cells: [
            {
                key: `title:${index}`,
                content: article.title,
            },
            {
                key: `content:${index}`,
                content: article.content,
            },
            {
                key: `author:${index}`,
                content: <User accountId={article.accountId}/>,
            },
            {
                key: `action:${index}`,
                content: (
                    <Inline space={"space.075"}>
                        <Button appearance={"default"} onClick={() => {}}>수정</Button>
                        <Button appearance={"danger"} onClick={() => onDeleteArticle(article)}>삭제</Button>
                    </Inline>
                )
            }
        ]
    }))

    return (
        <>
            <DynamicTable
                head={head}
                rows={rows}
                emptyView={"No articles yet."}
                isLoading={loading}/>
        </>
    );
}