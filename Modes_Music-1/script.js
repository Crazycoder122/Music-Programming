const notes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
const modes = ["Ionian","Dorian","Phrygian","Lydian","Mixolydian","Aeolian","Locrian"];
let temp = [];
let startIndex;

async function getData(note_name)
{
    let ans = [];

    // Getting the Data
    const data = await (await fetch('./formula.json')).json();

    // iterating through every mode
    for(let p=0;p<modes.length;p++)
    {
        // Getting the StartIndex of the Journey
        startIndex = notes.indexOf(note_name);
        temp = [];
        temp.push(note_name);

        // Traversing through all the notes of the mode
        for(let i=0;i<data[modes[p]].length-1;i++)
        {
            // Dealing with Whole steps
            if(data[modes[p]][i] == "W")
            startIndex+=2;

            // Dealing with Half Steps
            else
            startIndex+=1;

            // Adding the Required Note
            temp.push(notes[startIndex%12]);
        }

        // Adding the Required Mode in the Final Array
        ans.push(temp);
    }

    // Returning the final Array
    return ans;
}


(async function () {
    for(let i=0;i<notes.length;i++)
    {

        // Getting the Modes Collection for every note
        const arr = await getData(notes[i]);
        let intersection_set = new Set();
        
        // Getting the Unique Notes in that Set
        for(let i=0;i<arr.length;i++)
        {
            for(let j=0;j<arr[i].length;j++)
            intersection_set.add(arr[i][j]);
        }
    
        console.log(intersection_set);
    }

})();