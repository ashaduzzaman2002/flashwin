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
    <div class="App">
      <div class="app__responsive">
        <div style={{ minHeight: '100vh', background: 'rgb(42, 42, 42)' }}>
          <div class="agentPlan__top">
            <img src={agentBanner} width="100%" alt="" />
          </div>
          <div class="agentPlan__discription">
            The FieWin Agent Million Cash Growth Plan is divided into 7 levels,
            and each level has generous rewards. Complete the highest level and
            get a reward of ₹1000000 immediately.
          </div>

          {/* Lavels */}
          <div class="agentIncome__levelSection">
            {/* Lavel 1 */}
            <div class="agentIncome__level__col">
              <img
                src={lavel1}
                width="100%"
                alt=""
                onClick={() => setLevel1(!level1)}
              />
              {level1 && (
                <div class="startTaskPopup">
                  <div class="startTaskHeadTxt">Reward Conditions:</div>
                  <div class="startTaskSillyText">
                    Invite 1 person to register to receive and withdraw cash.
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Upgrade Skills:</div>
                  <div class="startTaskSillyText">
                    you share the link and someone register through your link,
                    that person can become my subordinate and I can get ₹1
                    immediately.
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">
                    Lucky Rupee promotional content and links
                  </div>
                  <div class="startTaskColumns">
                    <div class="startTaskColumnLeft">
                      Register to receive ₹10.Multiple ways to make money.{' '}
                      <br /> www.teslawin.com/register?ref=yourref
                    </div>
                    <button class="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">
                    Platform introduction promotion content and links
                  </div>
                  <div class="startTaskColumns">
                    <div class="startTaskColumnLeft">
                      Daily Check in rewards ₹10-₹1000. Task rewards ₹1135. HOT
                      Game - Party Up to 90% winning rate - Dice. Register to
                      receive ₹10. <br /> www.teslawin.com/register?ref=yourref
                    </div>
                    <button class="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">You can share them in:</div>
                  <button class="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 2 */}
            <div class="agentIncome__level__col">
              <img
                src={lavel2}
                width="100%"
                alt=""
                onClick={() => setLevel2(!level2)}
              />
              {level2 && (
                <div class="startTaskPopup">
                  <div class="startTaskHeadTxt">Reward Conditions:</div>
                  <div class="startTaskSillyText">
                    Invite 1 effective user to receive it. <br />
                    *Recharges 100 or more, it is a effective user.
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Upgrade Skills:</div>
                  <div class="startTaskSillyText">
                    Introduce the gameplay of Teslawin, and introduce the method
                    of recharging Teslawin.
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Minesweeper introduction</div>
                  <div class="startTaskColumns">
                    <div class="startTaskColumnLeft">
                      Exciting and fun minesweeping game, as long as you avoid
                      the mines, you will get benefits. You can decide how much
                      you get.
                    </div>
                    <button class="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Parity introduction</div>
                  <div class="startTaskColumns">
                    <div class="startTaskColumnLeft">
                      Popular and classic parity. Through the open color,
                      continuity and probability, it is easy to analyze each
                      color and get high rewards.
                    </div>
                    <button class="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Dice introduction</div>
                  <div class="startTaskColumns">
                    <div class="startTaskColumnLeft">
                      Dice with a huge odds combination. You can choose between
                      high probability and high odds. If you choose high
                      probability, you can easily win more than 10 times in a
                      row.
                    </div>
                    <button class="startTaskColumnRight">Copy</button>
                  </div>{' '}
                  <br />
                  <button class="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 3 */}
            <div class="agentIncome__level__col">
              <img
                src={lavel3}
                width="100%"
                alt=""
                onClick={() => setLevel3(!level3)}
              />
              {level3 && (
                <div class="startTaskPopup">
                  <div class="task__meter">
                    <div class="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div class="task__meter__bottom">
                    <div class="task__meter__bottom__left">0%</div>
                    <div class="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Reward Conditions:</div>
                  <div class="startTaskSillyText">
                    Invite 5 effective users to receive.{' '}
                  </div>
                  <br />
                  <div class="startTaskHeadTxt">Upgrade Skills:</div>
                  <div class="startTaskSillyText">
                    1. Expand the scope of sending promotional content,
                    including adding more Facebook groups, Whatsapp groups,
                    Instagram, Youtube comments, Telegram groups.
                    <br />
                    <br />
                    2. Increase the frequency of sending content.
                  </div>{' '}
                  <br />
                  <button class="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 4 */}
            <div class="agentIncome__level__col">
              <img
                src={lavel4}
                width="100%"
                alt=""
                onClick={() => setLevel4(!level4)}
              />

              {level4 && (
                <div class="startTaskPopup">
                  <div class="task__meter">
                    <div class="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div class="task__meter__bottom">
                    <div class="task__meter__bottom__left">0%</div>
                    <div class="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Reward Conditions:</div>
                  <div class="startTaskSillyText">
                    Invite 20 effective users to receive.{' '}
                  </div>
                  <br />
                  <div class="startTaskHeadTxt">Upgrade Skills:</div>
                  <div class="startTaskSillyText">
                    Try to create your own Whatsapp group, Telegram group,
                    Facebook group, invite all your subordinates, and social
                    networking site friends to join the group, and share the
                    game experience in the group.
                  </div>{' '}
                  <br />
                  <button class="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 5 */}
            <div class="agentIncome__level__col">
              <img
                src={lavel5}
                width="100%"
                alt=""
                onClick={() => setLevel5(!level5)}
              />

              {level5 && (
                <div class="startTaskPopup">
                  <div class="task__meter">
                    <div class="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div class="task__meter__bottom">
                    <div class="task__meter__bottom__left">0%</div>
                    <div class="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Reward Conditions:</div>
                  <div class="startTaskSillyText">
                    Invite 50 effective users to receive.{' '}
                  </div>
                  <br />
                  <div class="startTaskHeadTxt">Upgrade Skills:</div>
                  <div class="startTaskSillyText">
                    1. Make a video, introduce Teslawin in more detail, and
                    spread it to more places. <br />
                    <br />
                    2. Cooperate with YouTube self-media, website owners, large
                    Whatsapp group managers, and large Facebook group managers
                    to promote
                  </div>{' '}
                  <br />
                  <button class="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 6 */}
            <div class="agentIncome__level__col">
              <img
                src={lavel6}
                width="100%"
                alt=""
                onClick={() => setLevel6(!level6)}
              />

              {level6 && (
                <div class="startTaskPopup">
                  <center>Diamond-3</center>
                  <div class="task__meter">
                    <div class="task__parameter" style={{ width: '0%' }}></div>
                  </div>
                  <div class="task__meter__bottom">
                    <div class="task__meter__bottom__left">0%</div>
                    <div class="task__meter__bottom__right">100%</div>
                  </div>{' '}
                  <br />
                  <div class="startTaskHeadTxt">Reward Conditions:</div>
                  <div class="startTaskSillyText">
                    Invite 1000 effective users to receive.{' '}
                  </div>
                  <br />
                  <div class="startTaskHeadTxt">Upgrade Skills:</div>
                  <div class="startTaskSillyText">
                    The task is divided into 4 stages, and every time you
                    comlete a stage, you will get rewards for that stage.
                  </div>{' '}
                  <br />
                  <div class="startTaskTable">
                    <div class="startTaskTableRow">
                      <div
                        class="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 1
                      </div>
                      <div class="startTaskTableColumn">100 effective</div>
                      <div
                        class="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹10000
                      </div>
                    </div>
                    <div class="startTaskTableRow">
                      <div
                        class="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 2
                      </div>
                      <div class="startTaskTableColumn">200 effective</div>
                      <div
                        class="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹20000
                      </div>
                    </div>
                    <div class="startTaskTableRow">
                      <div
                        class="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 3
                      </div>
                      <div class="startTaskTableColumn">300 effective</div>
                      <div
                        class="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹30000
                      </div>
                    </div>
                    <div class="startTaskTableRow">
                      <div
                        class="startTaskTableColumn"
                        style={{ color: 'orange' }}
                      >
                        Diamond- 4
                      </div>
                      <div class="startTaskTableColumn">400 effective</div>
                      <div
                        class="startTaskTableColumn"
                        style={{ fontWeight: '500' }}
                      >
                        ₹40000
                      </div>
                    </div>
                  </div>
                  <button class="receivedTaskBtn">Receive Reward</button>
                </div>
              )}
            </div>

            {/* Lavel 7 */}
            <div class="agentIncome__level__col">
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
