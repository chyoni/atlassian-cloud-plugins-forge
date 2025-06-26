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
            isSortable: false,
        },
    ],
};

export const Board = ({articles, loading, onDeleteArticle, openEditModal, openReadModal}) => {

    const rows = articles.map((article, index) => ({
        key: `article:${article.id}:${index}`,
        cells: [
            {
                key: `title:${index}`,
                content: article.title,
            },
            {
                key: `content:${index}`,
                content: article.content.length > 30 ? `${article.content.substring(0, 30)}...` : article.content,
                colspan: 1,
            },
            {
                key: `author:${index}`,
                content: <User accountId={article.accountId}/>,
            },
            {
                key: `action:${index}`,
                content: (
                    <Inline space={"space.075"}>
                        <Button appearance={"subtle"} onClick={() => openReadModal(article)}>상세</Button>
                        <Button appearance={"default"} onClick={() => openEditModal(article)}>수정</Button>
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
                isRankable={true}
                isFixedSize={true}
                isLoading={loading}/>
        </>
    );
}