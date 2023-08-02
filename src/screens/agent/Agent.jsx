import React, { useState } from 'react';
import './agent.css';
import {
  agentBanner,
  lavel1,
  lavel2,
  lavel3,
  lavel4,
  lavel5,
  lavel6,
  lavel7,
} from '../../assets';

const Agent = () => {
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [level4, setLevel4] = useState(false);
  const [level5, setLevel5] = useState(false);
  const [level6, setLevel6] = useState(false);

  return (
    <div className="App">
      <div className="app__responsive">
        <div style={{ minHeight: '100vh', background: 'rgb(42, 42, 42)' }}>
          <div className="agentPlan__top">
            <img src={agentBanner} width="100%" alt="" />
          </div>
          <div className="agentPlan__discription">
            The FieWin Agent Million Cash Growth Plan is divided into 7 levels,
            and each level has generous rewards. Complete the highest level and
            get a reward of ₹1000000 immediately.
          </div>

          {/* Lavels */}
          <div className="agentIncome__levelSection">
            {/* Lavel 1 */}
            <div className="agentIncome__level__col">
              <img
                src={lavel1}
                width="100%"
                alt=""
                onClick={() => setLevel1(!level1)}
              />
              {level1 && (
                <div className="startTaskPopup">
                  <div className="startTaskHeadTxt">Reward Conditions:</div>
                  <div className="startTaskSillyText">
                    Invite 1 person to register to receive and withdraw cash.
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Upgrade Skills:</div>
                  <div className="startTaskSillyText">
                    you share the link and someone register through your link,
                    that person can become my subordinate and I can get ₹1
                    immediately.
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">
                    Lucky Rupee promotional content and links
                  </div>
                  <div className="startTaskColumns">
                    <div className="startTaskColumnLeft">
                      Register to receive ₹10.Multiple ways to make money.{' '}
                      <br /> www.teslawin.com/register?ref=yourref
                    </div>
                    <button className="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">
                    Platform introduction promotion content and links
                  </div>
                  <div className="startTaskColumns">
                    <div className="startTaskColumnLeft">
                      Daily Check in rewards ₹10-₹1000. Task rewards ₹1135. HOT
                      Game - Party Up to 90% winning rate - Dice. Register to
                      receive ₹10. <br /> www.teslawin.com/register?ref=yourref
                    </div>
                    <button className="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">You can share them in:</div>
                  <button className="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 2 */}
            <div className="agentIncome__level__col">
              <img
                src={lavel2}
                width="100%"
                alt=""
                onClick={() => setLevel2(!level2)}
              />
              {level2 && (
                <div className="startTaskPopup">
                  <div className="startTaskHeadTxt">Reward Conditions:</div>
                  <div className="startTaskSillyText">
                    Invite 1 effective user to receive it. <br />
                    *Recharges 100 or more, it is a effective user.
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Upgrade Skills:</div>
                  <div className="startTaskSillyText">
                    Introduce the gameplay of Teslawin, and introduce the method
                    of recharging Teslawin.
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Minesweeper introduction</div>
                  <div className="startTaskColumns">
                    <div className="startTaskColumnLeft">
                      Exciting and fun minesweeping game, as long as you avoid
                      the mines, you will get benefits. You can decide how much
                      you get.
                    </div>
                    <button className="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Parity introduction</div>
                  <div className="startTaskColumns">
                    <div className="startTaskColumnLeft">
                      Popular and classic parity. Through the open color,
                      continuity and probability, it is easy to analyze each
                      color and get high rewards.
                    </div>
                    <button className="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Dice introduction</div>
                  <div className="startTaskColumns">
                    <div className="startTaskColumnLeft">
                      Dice with a huge odds combination. You can choose between
                      high probability and high odds. If you choose high
                      probability, you can easily win more than 10 times in a
                      row.
                    </div>
                    <button className="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <button className="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 3 */}
            <div className="agentIncome__level__col">
              <img
                src={lavel3}
                width="100%"
                alt=""
                onClick={() => setLevel3(!level3)}
              />
              {level3 && (
                <div className="startTaskPopup">
                  <div className="task__meter">
                    <div className="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div className="task__meter__bottom">
                    <div className="task__meter__bottom__left">0%</div>
                    <div className="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Reward Conditions:</div>
                  <div className="startTaskSillyText">
                    Invite 5 effective users to receive.{' '}
                  </div>
                  <br />
                  <div className="startTaskHeadTxt">Upgrade Skills:</div>
                  <div className="startTaskSillyText">
                    1. Expand the scope of sending promotional content,
                    including adding more Facebook groups, Whatsapp groups,
                    Instagram, Youtube comments, Telegram groups.
                    <br />
                    <br />
                    2. Increase the frequency of sending content.
                  </div>{' '}
                  <br />
                  <button className="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 4 */}
            <div className="agentIncome__level__col">
              <img
                src={lavel4}
                width="100%"
                alt=""
                onClick={() => setLevel4(!level4)}
              />

              {level4 && (
                <div className="startTaskPopup">
                  <div className="task__meter">
                    <div className="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div className="task__meter__bottom">
                    <div className="task__meter__bottom__left">0%</div>
                    <div className="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Reward Conditions:</div>
                  <div className="startTaskSillyText">
                    Invite 20 effective users to receive.{' '}
                  </div>
                  <br />
                  <div className="startTaskHeadTxt">Upgrade Skills:</div>
                  <div className="startTaskSillyText">
                    Try to create your own Whatsapp group, Telegram group,
                    Facebook group, invite all your subordinates, and social
                    networking site friends to join the group, and share the
                    game experience in the group.
                  </div>{' '}
                  <br />
                  <button className="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 5 */}
            <div className="agentIncome__level__col">
              <img
                src={lavel5}
                width="100%"
                alt=""
                onClick={() => setLevel5(!level5)}
              />

              {level5 && (
                <div className="startTaskPopup">
                  <div className="task__meter">
                    <div className="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div className="task__meter__bottom">
                    <div className="task__meter__bottom__left">0%</div>
                    <div className="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Reward Conditions:</div>
                  <div className="startTaskSillyText">
                    Invite 50 effective users to receive.{' '}
                  </div>
                  <br />
                  <div className="startTaskHeadTxt">Upgrade Skills:</div>
                  <div className="startTaskSillyText">
                    1. Make a video, introduce Teslawin in more detail, and
                    spread it to more places. <br />
                    <br />
                    2. Cooperate with YouTube self-media, website owners, large
                    Whatsapp group managers, and large Facebook group managers
                    to promote
                  </div>{' '}
                  <br />
                  <button className="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 6 */}
            <div className="agentIncome__level__col">
              <img
                src={lavel6}
                width="100%"
                alt=""
                onClick={() => setLevel6(!level6)}
              />

              {level6 && (
                <div className="startTaskPopup">
                  <center>Diamond-3</center>
                  <div className="task__meter">
                    <div className="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div className="task__meter__bottom">
                    <div className="task__meter__bottom__left">0%</div>
                    <div className="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div className="startTaskHeadTxt">Reward Conditions:</div>
                  <div className="startTaskSillyText">
                    Invite 1000 effective users to receive.{' '}
                  </div>
                  <br />
                  <div className="startTaskHeadTxt">Upgrade Skills:</div>
                  <div className="startTaskSillyText">
                    The task is divided into 4 stages, and every time you
                    comlete a stage, you will get rewards for that stage.
                  </div>{' '}
                  <br />
                  <div className="startTaskTable">
                    <div className="startTaskTableRow">
                      <div
                        className="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 1
                      </div>
                      <div className="startTaskTableColumn">100 effective</div>
                      <div
                        className="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹10000
                      </div>
                    </div>
                    <div className="startTaskTableRow">
                      <div
                        className="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 2
                      </div>
                      <div className="startTaskTableColumn">200 effective</div>
                      <div
                        className="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹20000
                      </div>
                    </div>
                    <div className="startTaskTableRow">
                      <div
                        className="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 3
                      </div>
                      <div className="startTaskTableColumn">300 effective</div>
                      <div
                        className="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹30000
                      </div>
                    </div>
                    <div className="startTaskTableRow">
                      <div
                        className="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 4
                      </div>
                      <div className="startTaskTableColumn">400 effective</div>
                      <div
                        className="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹40000
                      </div>
                    </div>
                  </div>
                  <button className="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 7 */}
            <div className="agentIncome__level__col">
              <img src={lavel7} width="100%" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Level = ({ level, levelText, amount, color1, color2 }) => (
  <div
    className="level-card"
    style={{ background: `linear-gradient(90deg, ${color1}, ${color2})` }}
  >
    <div>
      <p>Level {level}</p>
      <p>{levelText}</p>
    </div>

    <p style={{ color: color1 }}>+₹{amount}</p>
  </div>
);

export default Agent;
