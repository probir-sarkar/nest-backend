import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class QuickEditService {
  constructor(private prisma: PrismaService) {}
  async create(createContactDto: CreateContactDto) {
    const { address, ...contactData } = createContactDto;
    const exisingContact = await this.prisma.contact.findUnique({
      where: {
        email_phone: {
          email: contactData.email,
          phone: contactData.phone,
        },
      },
    });

    if (exisingContact) {
      return { success: false, message: 'Contact already exists' };
    }

    await this.prisma.contact.create({
      data: {
        ...contactData,
        address: {
          create: {
            ...address,
          },
        },
      },
    });

    return { success: true, message: 'Contact created successfully' };
  }
  async update(id: number, createContactDto: CreateContactDto) {
    try {
      const { address, ...contactData } = createContactDto;
      const exisingContact = await this.prisma.contact.findUnique({
        where: {
          id,
        },
      });

      if (exisingContact) {
        await this.prisma.contact.update({
          where: {
            id,
          },
          data: {
            ...contactData,
            address: {
              update: {
                ...address,
              },
            },
          },
        });
        return { success: true, message: 'Contact updated successfully' };
      }
      return { success: false, message: 'Contact not found' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async findAll() {
    return this.prisma.contact.findMany();
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });
    if (contact) {
      return { contact: contact, success: true };
    }
    return { success: false, message: 'Contact not found' };
  }

  async patch(id: number, updateContactDto: UpdateContactDto) {
    try {
      const contactData = updateContactDto;
      if (Object.keys(contactData).length === 0)
        return { success: false, message: 'No fields to update' };
      const contact = await this.prisma.contact.update({
        where: {
          id,
        },
        data: {
          ...contactData,
        },
      });
      if (contact) {
        return {
          success: true,
          message: 'Contact updated successfully',
          contact,
        };
      }
      return { success: false, message: 'Contact not found' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async remove(id: number) {
    try {
      const contact = await this.prisma.contact.delete({
        where: {
          id,
        },
      });
      if (contact) {
        return { success: true, message: 'Contact deleted successfully' };
      }
      return { success: false, message: 'Contact not found' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
