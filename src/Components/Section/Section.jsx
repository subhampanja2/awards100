import React, { lazy, Suspense } from 'react'
import "./Section.css"

const Nominee = lazy(() => import('../Nominee/Nominee'));

function Section({ data, selectNominee }) {
    const { id, title, items } = data;
    return (
        <div className='section_container'>
            <div className='section_title'>
                <h2>{title}</h2>
            </div>
            <div className='section_nominee'>
                {
                    items?.map((nominee) => (
                        <Suspense fallback={<div>loading...</div>} key={nominee.id} >
                            <Nominee data={nominee} sectionId={id} selectNominee={selectNominee} />
                        </Suspense>
                    ))
                }
            </div>
        </div>
    )
}

export default Section