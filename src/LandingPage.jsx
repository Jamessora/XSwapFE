import React from 'react';
import ButtonUsage from './test';
import PersistentDrawerLeft from './components/Sidebar';


const LandingPage = () => {
    return (
      
        <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <PersistentDrawerLeft />
          <ButtonUsage />
            <div style={{ backgroundColor: "lightgrey", textAlign: "center", padding: "20px" }}>
                <h1 style={{ margin: "0" }}>My Website</h1>
                <p>A website created by me.</p>
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ flex: "33.33%", padding: "15px" }}>
                    <h1>Column 1</h1>
                    <p>Click the button to toggle between hiding and showing the dropdown content.</p>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <button>Click Me!</button>
                        <div style={{ display: "none", position: "absolute", backgroundColor: "#f9f9f9", minWidth: "160px", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)", zIndex: "1" }}>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>

                <div style={{ flex: "33.33%", padding: "15px" }}>
                    <h1>Column 2</h1>
                    <p>Some text..</p>
                    <p>Some text..</p>
                </div>

                <div style={{ flex: "33.33%", padding: "15px" }}>
                    <h1>Column 3</h1>
                    <p>Some text..</p>
                </div>
            </div>

            <div style={{ backgroundColor: "#f1f1f1", padding: "10px" }}>
                <h1>Footer</h1>
                <p>Footer information goes here</p>
            </div>
        </div>
    );
};

export default LandingPage;
