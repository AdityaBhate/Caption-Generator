"use client"

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react"
import TranscriptionEditor from "../../components/TranscriptionEditor"
import { clearTranscriptionItems } from "../../libs/awsTranscriptionHelpers"
import ResultVideo from "../../components/ResultVideo"

function FilePage({ params }) {
    const filename = params.filename;
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isFetchingInfo, setIsFetchingInfo] = useState(false);
    const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]);

    useEffect(() => {
        getTranscription();
    }, [filename])

    function getTranscription() {
        setIsFetchingInfo(true)
        axios.get('/api/transcribe?filename=' + filename).then(response => {
            const status = response.data?.status;
            const transcription = response.data?.transcription;
            setIsFetchingInfo(false)
            if (status === "IN_PROGRESS") {
                setIsTranscribing(true);
                setTimeout(getTranscription(), 3000);
            } else {
                setIsTranscribing(false);
                const items = clearTranscriptionItems(transcription);
                setAwsTranscriptionItems(items);
            }

        });
    }

    if (isTranscribing) {
        return (<div>Transcribing your Videos...</div>)
    }

    if (isFetchingInfo) {
        return (<div>Fetching information...</div>)
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-16">
                <div>
                    <h2 className="text-2xl mb-4 text-white/50">Transcription</h2>
                    <TranscriptionEditor awsTranscriptionItems={awsTranscriptionItems} setAwsTranscriptionItems={setAwsTranscriptionItems} />
                </div>
                <div>
                    <h2 className="text-2xl mb-4 text-white/50">Result</h2>
                    <ResultVideo filename={filename} awsTranscriptionItems={awsTranscriptionItems} />
                </div>
            </div>

        </div>
    )
}

export default FilePage