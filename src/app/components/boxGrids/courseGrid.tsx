"use client"
import CourseBox from "./courseBox"
import { useState, useEffect, useCallback } from "react"
import { CourseProps } from "./courseBox";
import AddItemTile from "./addItemTile";
import ItemFormModal from "../admin/itemFormModal";

export interface CourseGridProps {
    admin?: boolean;
}

type ModalState =
    | { mode: "create" }
    | { mode: "edit"; initial: CourseProps }
    | null;

export default function CourseGrid({ admin = false }: CourseGridProps){

    const [courses, setCourses] = useState<CourseProps[]>([]);
    const [modal, setModal] = useState<ModalState>(null);

    const refetch = useCallback(async () => {
        const response = await fetch("/api/db?type=COURSES");
        if (response.ok) {
            const data: CourseProps[] = await response.json();
            const sortedData = data.sort((a, b) => Number(b.rigor) - Number(a.rigor));
            setCourses(sortedData);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    async function deleteCourse(name: string): Promise<boolean> {
        const res = await fetch(`/api/admin/courses/${encodeURIComponent(name)}`, {
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
                {courses.map((course) => (
                    <div key={course.name}>
                        <CourseBox
                            name={course.name}
                            courseTitle={course.courseTitle}
                            description={course.description}
                            lessons={course.lessons}
                            href={course.href}
                            rigor={course.rigor}
                            onEdit={admin ? () => setModal({ mode: "edit", initial: course }) : undefined}
                        />
                    </div>
                ))}
                {admin && (
                    <div>
                        <AddItemTile label="Add course" onClick={() => setModal({ mode: "create" })} />
                    </div>
                )}
            </div>

            {admin && modal && (
                <ItemFormModal
                    entityType="courses"
                    mode={modal.mode}
                    initial={modal.mode === "edit" ? modal.initial : undefined}
                    onClose={() => setModal(null)}
                    onSaved={refetch}
                    onDelete={
                        modal.mode === "edit"
                            ? () => deleteCourse(modal.initial.name)
                            : undefined
                    }
                />
            )}
        </>
    );
}
