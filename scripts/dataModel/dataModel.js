const {
    HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField
  } = foundry.data.fields;

/* -------------------------------------------- */
/*  Base Models                                 */
/* -------------------------------------------- */

class Stat extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            id: new StringField({ required: true, initial: "statID"}),
            name: new StringField({ required: true, intial: "Stat"}),
            die: new NumberField({ required: true, integer: true, min: 0, max: 20, initial: 4}),
            modifiers: new ArrayField({ required: true, type: Modifier, default: []}),
        };
    }
}

class Modifier extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            statID: new StringField({ required: true, initial: "statID"}),
            name: new StringField({ required: true, initial: "Modifier"}),
            value: new NumberField({ required: true, integer: true, initial: 0}),
        };
    }

    Modifier(statID,name,value) {
        this.statID = statID;
        this.name = name;
        this.value = value;
    };
}

/* -------------------------------------------- */
/*  Effect Models                               */
/* -------------------------------------------- */

class EffectDataModel extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            description: new StringField({ required: true, initial: "A EffectDescription" }),
            modifier: new Modifier({ required: true, nullable: true, default: null}),
        };
    }
}

class Flaw extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            name: new StringField({ required: true, initial: "Flaw"}),
            description: new StringField({ required: true, initial: "A FlawDescription" })
        };
    }
}

class Strength extends EffectDataModel
{
    static defineSchema() {
        return {
            ...super.defineSchema(),
            name: new StringField({ required: true, initial: "Strength"})
        };
    }
}

/* -------------------------------------------- */
/*  Item Models                                 */
/* -------------------------------------------- */
/* How this will work is when we first load a sheet we load all the items we have and take their effects and apply them to our stats. */

class Item extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            name: new StringField({ required: true, initial: "Item"}),
            description: new StringField({ required: true, initial: "An ItemDescription" }),
            effects: new ArrayField({ required: true, type: EffectDataModel, default: []}),
        };
    }

    Item(name,description,effects) {
        this.name = name;
        this.description = description;
        this.effects = effects;
    }
}

class Wand extends Item
{
    static defineSchema() {
        return {
            name: new StringField({ required: true, initial: "Wand"}),
            wood: new Item({ required: true, initial: new Item()}),
            core: new Item({ required: true, initial: new Item()}),
        };
    }
}


/* -------------------------------------------- */
/*  Actor Models                                */
/* -------------------------------------------- */
