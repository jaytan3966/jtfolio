"use client"
import ExperienceBox from "./experienceBox"
import { useState, useEffect, useCallback } from "react"
import { ExpProps } from "./experienceBox";
import AddItemTile from "./addItemTile";
import ItemFormModal from "../admin/itemFormModal";

export interface ExperienceGridProps {
    admin?: boolean;
}

type ModalState =
    | { mode: "create" }
    | { mode: "edit"; initial: ExpProps }
    | null;

export default function ExperienceGrid({ admin = false }: ExperienceGridProps){

    const [exps, setExp] = useState<ExpProps[]>([]);
    const [modal, setModal] = useState<ModalState>(null);

    const refetch = useCallback(async () => {
        const response = await fetch("/api/db?type=EXPERIENCE");
        if (response.ok) {
            const data: ExpProps[] = await response.json();
            const sorted = [...data].sort(
                (a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER)
            );
            setExp(sorted);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    async function deleteExperience(name: string): Promise<boolean> {
        const res = await fetch(`/api/admin/experiences/${encodeURIComponent(name)}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            const body = await res.json().catch(() => null);
            alert(`Failed to delete: ${body?.error ?? res.status}`);
            return false;
        }
        await refetch();
        return true;
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-stretch w-full">
                {exps.map((exp) => (
                    <div key={exp.name}>
                        <ExperienceBox
                            name={exp.name}
                            title={exp.title}
                            description={exp.description}
                            skills={exp.skills}
                            href={exp.href}
                            onEdit={admin ? () => setModal({ mode: "edit", initial: exp }) : undefined}
                        />
                    </div>
                ))}
                {admin && (
                    <div>
                        <AddItemTile label="Add experience" onClick={() => setModal({ mode: "create" })} />
                    </div>
                )}
            </div>

            {admin && modal && (
                <ItemFormModal
                    entityType="experience"
                    mode={modal.mode}
                    initial={modal.mode === "edit" ? modal.initial : undefined}
                    onClose={() => setModal(null)}
                    onSaved={refetch}
                    onDelete={
                        modal.mode === "edit"
                            ? () => deleteExperience(modal.initial.name)
                            : undefined
                    }
                />
            )}
        </>
    );
}
