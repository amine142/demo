<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220210104013 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs       
        for ($i=1; $i<10; $i++){
          $this->addSql('INSERT INTO article (id, title, "content") VALUES("'.$i.'", "title'.$i.'", "content'.$i.'");');  
        }
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DELETE FROM TABLE article');
    }
}
