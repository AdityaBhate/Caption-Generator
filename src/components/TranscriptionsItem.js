import { useState } from 'react'

function TranscriptionsItemEditor({ item, index, handleStartTimeChange, handleEndTimeChange, handleContentChange }) {
    if (!item) {
        return ""
    }
    return (
        <>
            <div key={index} className='my-1 grid grid-cols-3 gap-1 items-center'>
                <input
                    className="bg-white/20 text-white p-1 rounded-md"
                    type="text"
                    value={item.start_time}
                    onChange={handleStartTimeChange} />
                <input
                    className="bg-white/20 text-white p-1 rounded-md"
                    type="text"
                    value={item.end_time}
                    onChange={(e) => handleEndTimeChange(e, index)} />
                <input
                    className="bg-white/20 text-white p-1 rounded-md"
                    type="text"
                    value={item.content}
                    onChange={(e) => handleContentChange(e, index)} />
            </div>
        </>
    )
}

export default TranscriptionsItemEditor