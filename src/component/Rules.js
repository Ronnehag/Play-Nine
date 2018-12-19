import React from 'react';

const Rules = (props) => {

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-6 mx-auto card" style={{ marginTop: 30, backgroundColor: '#eee' }}>
                    <h3>Rules</h3>
                    <p>
                        Game will show a set of stars between 1 - 9.
                        You will select numbers that match the count of stars.
                        For example, 5 stars are shown. You can select 5 OR 3 + 2.
                        After you selected the numbers you press the equal button, it's flagged green if it passes or red if it doesn't add up.
                        Press the button again to confirm your choice.
                    </p>
                    <p>
                        You may only use a number once, all used numbers will be disabled.
                        If you can't find a possible solution you may use the refresh button, this will redraw the stars. You may use this button five times.

                        You win if you have used all numbers.
                        You will lose if the time runs out or you have no possible solutions left after you used all your resets.

                    </p>
                    <h4>Good luck!</h4>
                </div>
            </div>
        </div>
    )
}

export default Rules;