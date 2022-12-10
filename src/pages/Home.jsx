import React, { useEffect, useState, lazy, Suspense } from 'react';
import api from '../Api/Api';
import "./Home.css"

const Section = lazy(() => import('../Components/Section/Section'));

function Home() {

    const [allData, setAllData] = useState([]);
    const [selectedSectionCount, setSelectedSectionCount] = useState({});

    useEffect(() => {
        api.getBallotData()
            .then((data) => setAllData(data.items))
            .catch((err) => console.log(err.message));
    }, []);

    function selectNominee(sectionId, nomineeId) {
        let updatedData = allData.map((all) => {
            if (sectionId === all.id) {
                all.items.map((nominee) => {
                    if (nominee.id === nomineeId) {
                        nominee.selected = true;
                        let section = selectedSectionCount[sectionId] = selectedSectionCount[sectionId] || 1;
                        setSelectedSectionCount({ ...selectedSectionCount, ...section })
                        return nominee;
                    } else {
                        delete nominee['selected']
                        return nominee
                    }
                })
                return all;
            } else {
                return all
            }
        });
        setAllData(updatedData);
    }


    function handleSubmit() {
        if (Object.keys(selectedSectionCount).length === allData.length) {
            alert("Ballot submitted")
        } else {
            alert("Please select all sections")
        }
    }

    return (
        <div className="container_fluid">
            {/* section  */}
            <div className='container'>
                {
                    allData.map((section) => (
                        <Suspense fallback={<div>Loading...</div>} key={section.id}>
                            <Section data={section} selectNominee={selectNominee} />
                        </Suspense>
                    ))
                }
            </div>
            {/* submit button  */}
            <div className="submit_ballot">
                <button className='button large' onClick={() => handleSubmit()}>Submit ballot</button>
            </div>
        </div>
    )
}

export default Home