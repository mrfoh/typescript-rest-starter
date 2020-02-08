import { Schema } from 'mongoose';

export default function mongooseSoftDeletes(schema: Schema) {
    schema.add({ deleted: Boolean });
    schema.add({ deletedAt: Date });

    schema.pre('save', function (next) {
        if (!this['deleted']) {
            this['deleted'] = false;
        }

        if (!this['deletedAt']) {
            this['deletedAt'] = null;
        }

        next();
    });

    schema.methods.softdelete = async function() {
        this.deleted = true;
        this.deletedAt = new Date();
        await this.save();
    };

    schema.methods.restore = async function() {
        this.deleted = false;
        this.deletedAt = null;
        await this.save();
    };

    schema.query.isDeleted = function(cond) {
        if (typeof cond === 'undefined') {
            cond = true;
        }

        return this.find({
            deleted: cond
        });
    };
}