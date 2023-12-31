"""empty message

Revision ID: 8809e67d6079
Revises: 495d76d7ca95
Create Date: 2023-10-08 16:47:41.864017

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8809e67d6079'
down_revision = '495d76d7ca95'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_constraint('favorites_vehicle_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('favorites_people_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('favorites_planet_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('favorites_user_id_fkey', type_='foreignkey')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.create_foreign_key('favorites_user_id_fkey', 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key('favorites_planet_id_fkey', 'planet', ['planet_id'], ['id'])
        batch_op.create_foreign_key('favorites_people_id_fkey', 'people', ['people_id'], ['id'])
        batch_op.create_foreign_key('favorites_vehicle_id_fkey', 'vehicle', ['vehicle_id'], ['id'])
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
