### Static API description

Our API  lets you create text game with your option to choose an outcome. When you choose one of the options, content of the page should switch to the new scene and options of that scene.  Below we provided story structure that is being provided with this API as an example.

##### Routes
  `api/stories` `/api/stories/:story_id` `/api/stories/:story_id/scenes`  `/api/stories/:story_id/scenes/:scene_id`
 `/api/scenes/:scene_id/options`

Each scene exist only within a specific story and options exist only within a specific scene.

You can not delete option if you not in the scene that that option belongs to.

Scene can be deleted only within a  specific story.

Each story shows only scenes, but not the options.To see options go to specific scene
 at “localhost:8080/api/scenes/:scene_id/options”.

#### Static Storyline

Story is color coded. Scene color matches with an options for that scene. All ending scenes are black color. Even though we provided which scenes should go after specific option feel free to alter that, because options not connected to the following scenes. Story is provided as an external database file that you’ll have to import yourself.

<p style="color:blue">Scene: It’s an early sunday morning,you are baking some cookies,listening to the radio.You hear a shout from the street:” There is a big bad Wolf heading this way”. He is almost here and he is bad to the bone.You known this day was coming he is formidable foe.Time to pigg up what are you  going to do?</p>

<p style="color:red">Option: Escape the house</p>

<p style="color:blue">Scene:  you sneaked out the house,what will you do?</p>

<p style="color:red">Option: Start the fire</p>

<p style="color:blue">Scene: Your house burned down with the wolf inside.You live happily ever after,as a homeless pig.</p>

<p style="color:red">Option: Leave and never come back.  Start a new life.</p>

<p style="color:blue">Scene: You live the long live of a coward.  Was it really worth it?</p>

<p style="color:red">Option: Call for help</p>

<p style="color:blue">Scene:  Nobody is coming.  Wolf attacks you from the balcony you DEAD!</p>

<p style="color:red">Option:  Hide under the couch

<p style="color:blue">Scene:Wolf enters the house huffing and puffing looking for you.”Where are you Piggy-Piggy….?It’s lunch time!!”Wolf ransacking the house, as you fearfully looking from under the couch.He went upstair to check out your bedroom, while eating cookie dough.You got angry, your action:

<p style="color:red">Option: sneak out of the house

<p style="color:blue">Scene: you sneaked out the house, what will you do?

<p style="color:red">Option: Start the fire

<p style="color:blue">Scene:Your house burned down with the wolf inside. You live happily ever after, as a homeless pig.

<p style="color:red">Option: Leave and never come back.start a new life.

<p style="color:blue">Scene: You live the long live of a coward. Did it really worth it?

<p style="color:red">Option: Call for help

<p style="color:blue">Scene: - Nobody is coming. Wolf attacks you from the balcony you DEAD!

<p style="color:red">Option: stay hidden

<p style="color:blue">Scene: Wolf is still upstairs,What will you do?

<p style="color:red">Option: Call for help

<p style="color:blue">Scene: Wolf hears you and eats you.

<p style="color:red">Option: leave the house

<p style="color:blue">Scene: He chases you into the street and eats you.

<p style="color:red">Option: Wait till the night

<p style="color:blue">Scene: Wolf is sleeping in your bed.You grabbed your sword you chopped the wolf.You live happily ever after.

<p style="color:red">Option:  Attack him

<p style="color:blue">Scene: Choose your weapon:

<p style="color:red">Option: a Grab the antique rifle of your wall

<p style="color:blue">Scene: Too bad you out of ammo.Wolf eats you.

<p style="color:red">Option: Pick up your sword in your umbrella bucket

<p style="color:blue">Scene: You slay him and keep baking your cookies.

<p style="color:red">Option: You decided to attack him with bear hands

<p style="color:blue">Scene: That was a very bad idea you died and wolf ate all your cookies.

<p style="color:red">Option: Open the door and confront him

<p style="color:blue">Scene: He rips your head and and now the blood is all over your place and on your sparkling white new carpet.You are DEAD!
