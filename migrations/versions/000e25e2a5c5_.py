"""empty message

Revision ID: 000e25e2a5c5
Revises: 8809e67d6079
Create Date: 2023-12-03 08:35:26.247328

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '000e25e2a5c5'
down_revision = '8809e67d6079'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('people', schema=None) as batch_op:
        batch_op.drop_column('favorite')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('people', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite', sa.BOOLEAN(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
