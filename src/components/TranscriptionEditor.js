import React from 'react'
import TranscriptionsItem from "./TranscriptionsItem"

function TranscriptionEditor({ awsTranscriptionItems, setAwsTranscriptionItems }) {

    function updateAWSItem(index, prop, e) {
        const newAWSItems = [...awsTranscriptionItems];
        const newItem = { ...newAWSItems[index] };
        newItem[prop] = e.target.value;
        newAWSItems[index] = newItem;
        setAwsTranscriptionItems(newAWSItems);
    }

    return (
        <>
            <div className="grid grid-cols-3 sticky top-0 bg-violet-800/50 p-1 rounded-md">
                <div>Start Time</div>
                <div>End Time</div>
                <div>Caption</div>
            </div>
            {awsTranscriptionItems.length > 0 &&
                <div>
                    {awsTranscriptionItems.map((item, index) => {
                        return (
                            <TranscriptionsItem
                                key={index}
                                item={item}
                                handleStartTimeChange={(e) => updateAWSItem(index, "start_time", e)}
                                handleEndTimeChange={(e) => updateAWSItem(index, "end_time", e)}
                                handleContentChange={(e) => updateAWSItem(index, "content", e)} />
                        )
                    })}
                </div>
            }
        </>
    )
}

export default TranscriptionEditor