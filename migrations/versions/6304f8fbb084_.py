"""empty message

Revision ID: 6304f8fbb084
Revises: ef98795228b8
Create Date: 2024-01-24 10:44:13.479593

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6304f8fbb084'
down_revision = 'ef98795228b8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('favorites_user_id_fkey', type_='foreignkey')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.create_foreign_key('favorites_user_id_fkey', 'user', ['user_id'], ['id'])
        batch_op.drop_column('favorite_id')

    # ### end Alembic commands ###
