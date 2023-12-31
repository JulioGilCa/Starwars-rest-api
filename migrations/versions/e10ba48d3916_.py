"""empty message

Revision ID: e10ba48d3916
Revises: 3bcbe4fb93c1
Create Date: 2023-09-12 11:40:09.599401

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e10ba48d3916'
down_revision = '3bcbe4fb93c1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('planet', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(), nullable=True))

    with op.batch_alter_table('vehicle', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vehicle', schema=None) as batch_op:
        batch_op.drop_column('image_url')

    with op.batch_alter_table('planet', schema=None) as batch_op:
        batch_op.drop_column('image_url')

    # ### end Alembic commands ###
