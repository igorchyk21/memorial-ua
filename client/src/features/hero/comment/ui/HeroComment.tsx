"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "@/shared/context/Auth";
import BlockSpinner from "@/shared/ui/spinners/BlockSpinner";
import { useTranslations } from "next-intl";
import { useHeroComment } from "../model/useHeroComment";

interface Props {
    heroId: number;
    comment?: string | null;
}

const MAX_COMMENT_LENGTH = 2500;

const HeroComment = ({ heroId, comment }: Props) => {
    const { auth } = useAuth();
    const { saveComment } = useHeroComment();
    const t = useTranslations();

    const [displayText, setDisplayText] = useState(comment ?? "");
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(comment ?? "");
    const [isPending, setIsPending] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setDisplayText(comment ?? "");
    }, [comment]);

    useEffect(() => {
        if (!editing) {
            setDraft(displayText);
        }
    }, [editing, displayText]);

    useEffect(() => {
        if (!editing) return;
        const id = requestAnimationFrame(() => {
            textareaRef.current?.focus();
        });
        return () => cancelAnimationFrame(id);
    }, [editing]);

    if (!auth?.user.admin) return null;

    const startEdit = () => {
        setDraft(displayText.slice(0, MAX_COMMENT_LENGTH));
        setEditing(true);
    };

    const cancelEdit = () => {
        setDraft(displayText);
        setEditing(false);
    };

    const submit = async () => {
        setIsPending(true);
        const ok = await saveComment(heroId, draft);
        setIsPending(false);
        if (ok) {
            setDisplayText(draft);
            setEditing(false);
        }
    };

    return (
        <div className="mb-4">
            <div className="border rounded-4 p-3 p-sm-4 bg-body-tertiary position-relative">
                <BlockSpinner show={isPending} borderRadius="1rem" />

                {!editing ? (
                    <>
                        <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 align-items-sm-center">
                            <div className="d-flex align-items-center gap-2 flex-grow-1 align-self-start min-w-0">
                                <i
                                    className="ci-shield fs-4 text-primary flex-shrink-0"
                                    aria-hidden="true"
                                    title={t("hero.comment.title")}
                                />
                                <h5 className="mb-0">{t("hero.comment.title")}</h5>
                            </div>
                            <Button
                                type="button"
                                variant="outline-primary"
                                className="px-4 align-self-end align-self-sm-start flex-shrink-0"
                                disabled={isPending}
                                onClick={startEdit}
                            >
                                {t("hero.comment.edit")}
                            </Button>
                        </div>
                        <div
                            className="mt-3 mb-0 fs-14 text-dark-emphasis"
                            style={{ whiteSpace: "pre-wrap", lineHeight: 1.45 }}
                        >
                            {displayText.trim() ? displayText : (
                                <span className="text-secondary">{t("hero.comment.empty")}</span>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex align-items-center gap-2 min-w-0">
                            <i
                                className="ci-shield fs-4 text-primary flex-shrink-0"
                                aria-hidden="true"
                                title={t("hero.comment.title")}
                            />
                            <h5 className="mb-0">{t("hero.comment.title")}</h5>
                        </div>
                        <Form.Control
                            ref={textareaRef}
                            as="textarea"
                            rows={5}
                            value={draft}
                            onChange={(e) =>
                                setDraft(e.target.value.slice(0, MAX_COMMENT_LENGTH))
                            }
                            disabled={isPending}
                            maxLength={MAX_COMMENT_LENGTH}
                            className="fs-14"
                        />
                        <div className="d-flex flex-wrap gap-2 justify-content-end">
                            <Button
                                type="button"
                                variant="outline-secondary"
                                disabled={isPending}
                                onClick={cancelEdit}
                            >
                                {t("hero.comment.cancel")}
                            </Button>
                            <Button type="button" variant="primary" disabled={isPending} onClick={submit}>
                                {t("hero.comment.save")}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroComment;
