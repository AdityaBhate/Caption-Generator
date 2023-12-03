export function clearTranscriptionItems(transcription) {
    transcription.results.items.forEach((item, key) => {
        if (!item.start_time) {
            transcription.results.items[key - 1].alternatives[0].content += item.alternatives[0].content;
            delete transcription.results.items[key];
        }
    })
    return transcription.results.items
        .map(item => {
            return {
                start_time: item.start_time,
                end_time: item.end_time,
                content: item.alternatives[0].content
            }
        })
}

function secondsToHHMMSSMS(timeString) {
    const d = new Date(parseFloat(timeString) * 1000);
    return d.toISOString().slice(11, 23).replace('.', ',');
}

export function transcriptonItemToSrt(items) {
    let srt = '';
    let i = 1;
    items.filter(item => !!item).forEach(item => {
        srt += i + "\n";
        const { start_time, end_time } = item;
        srt += secondsToHHMMSSMS(start_time)
            + ' --> '
            + secondsToHHMMSSMS(end_time)
            + "\n";

        srt += item.content + "\n";
        srt += "\n";
        i++;
    });
    return srt;
}