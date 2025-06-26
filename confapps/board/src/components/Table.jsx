import React from 'react';
import {Button, DynamicTable, Inline, User, useTranslation} from "@forge/react";

export const Table = ({articles, loading, onDeleteArticle, openEditModal, openReadModal}) => {
    const {t} = useTranslation();

    const head = {
        cells: [
            {
                key: "title",
                content: t(`field.title`),
                isSortable: true,
            },
            {
                key: "content",
                content: t(`field.content`),
                shouldTruncate: true,
                isSortable: true,
            },
            {
                key: "author",
                content: t(`field.author`),
                isSortable: true,
            },
            {
                key: "action",
                content: t(`field.action`),
                isSortable: false,
            },
        ],
    };

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
                        <Button appearance={"subtle"}
                                onClick={() => openReadModal(article)}>{t(`button.detail`)}</Button>
                        <Button appearance={"default"}
                                onClick={() => openEditModal(article)}>{t(`button.edit`)}</Button>
                        <Button appearance={"danger"}
                                onClick={() => onDeleteArticle(article)}>{t(`button.delete`)}</Button>
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
                emptyView={t(`article.empty.suggestions`)}
                rowsPerPage={5}
                isRankable={true}
                isFixedSize={true}
                isLoading={loading}/>
        </>
    );
}