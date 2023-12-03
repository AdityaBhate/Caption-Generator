import React from 'react'

function PageHeader({ heading = "Heading", subHeading = "Sub Heading" }) {
    return (
        <section className="text-center mt-24 mb-8">
            <h1 className="text-3xl" style={{ textShadow: '2px 2px 0 rgba(0,0,0, 0.3)' }}>{heading}</h1>
            <h2 className="text-white/75">{subHeading}</h2>
        </section>
    )
}

export default PageHeader